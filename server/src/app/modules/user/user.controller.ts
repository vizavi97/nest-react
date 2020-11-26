import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/core';
import argon2 from 'argon2';
import { User } from '../../entities/User';
import { Response, Request } from 'express';
import { fieldValidator } from '../../utils/functions';
import argon from 'argon2';

@Controller('user')
export class UserController {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
  ) {}

  @Get()
  getHi() {
    return 'hi';
  }
  @Post('/register')
  async register(@Req() req: Request, @Res() res: Response) {
    const params = req.body;
    const fieldError = fieldValidator(params);
    if (fieldError) {
      return res.status(401).json(fieldError);
    }
    try {
      const hashedPassword = await argon2.hash(params.password);
      const user = await this.userRepository.create({
        email: params.email,
        phone: params.phone,
        name: params.name,
        surname: params.surname,
        password: hashedPassword,
        address: params.address ? JSON.stringify(params.address) : null,
        role: 1,
      });
      await this.userRepository.persistAndFlush(user);
      return res.send(user);
    } catch (e) {
      console.log(e);
      if (e.code == 23505) {
        return res.status(400).json({
          field: 'user',
          message: 'User is already exist',
        });
      }
      return res.status(400).json({ err: e });
    }
  }
  @Post('/login')
  async login(@Req() req: Request, @Res() res: Response) {
    const params = req.body;
    const fieldError = fieldValidator(params);
    if (fieldError) {
      return res.status(401).json(fieldError);
    }
    try {
      const user = await this.userRepository.findOne({ phone: params.phone });
      if (!user) {
        return res.status(403).send({
          errors: [
            {
              field: 'username Or Email',
              message: "that username doesn't exist",
            },
          ],
        });
      }
      const valid = await argon.verify(user.password, params.password);
      if (!valid) {
        return res.json({
          errors: [
            {
              field: 'password',
              message: 'incorrect password',
            },
          ],
        });
      }
      return res.status(200).send(user);
    } catch (e) {
      return res.status(403).send('asdas');
    }
  }
}
