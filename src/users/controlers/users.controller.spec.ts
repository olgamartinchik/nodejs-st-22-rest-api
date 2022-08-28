import { User } from '@src/users/models/user.model';
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../services/users.service';
import { UserController } from './users.controller';
import { Group } from '@src/group/models/group.model';
import { UsersRepository } from '../repository/user.repository';
import { getModelToken  } from '@nestjs/sequelize';
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';

const moduleMocker = new ModuleMocker(global);

const userDto={
  login: 'kirill',
  password: '1234qwer',
  age: 10,
}
const userMock={
  id: 'c8b66535-0410-4c4d-8dae-267ae1098654',
 ...userDto,
  isDeleted: false, 
} 
const users=[userMock]
enum ExceptionError {
  BadRequestException = 'Bad Request',
  ConflictException='Such login exists'
}

describe('UsersController', () => {
  let controller: UserController;


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],     
      
    })
    .useMocker((token) => {
      if (token === UserService) {
        return {
        
          create: jest.fn().mockResolvedValue(userMock),
          getAll: jest.fn().mockResolvedValue(users),
          getOne: jest.fn().mockResolvedValue(userMock),
          update: jest.fn().mockResolvedValue(userMock),
          remove: jest.fn().mockResolvedValue(undefined),
        };
      }
      if (typeof token === 'function') {
        const mockMetadata = moduleMocker.getMetadata(
          token,
        ) as MockFunctionMetadata<any, any>;
        const Mock = moduleMocker.generateFromMetadata(mockMetadata);
        return new Mock();
      }
    })
    .compile();

    controller = module.get<UserController>(UserController);
    
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

it("should create new user", async()=>{
  expect.assertions(1);
  expect(await controller.create(userDto)).toEqual(
    userMock||ExceptionError.ConflictException
  );
})

  it("should returned all users", async()=>{
    const loginSubstring='kirill'
    const limit = 1
    expect.assertions(1);
    expect(async()=>{
      await controller.getAll(loginSubstring,limit)
    }).not.toEqual(expect.arrayContaining(users)||ExceptionError.BadRequestException)
  })

it("should return user by id", async()=>{
 
  try{
    expect(await controller.getOne(userMock.id)).toEqual( userMock);
  }catch{
    expect(ExceptionError.BadRequestException);
  }

})

  it('should return updated user', async () => {
    expect.assertions(1);
      expect(await controller.update(userDto,userMock.id, )).toEqual(
        userMock||ExceptionError.BadRequestException
      );
    
  });

  it("should deleted user", async()=>{
    expect.assertions(1);
    try {
      expect(await controller.remove(userMock.id)).toEqual(undefined);
    } catch (error) {
      expect(error).toBeInstanceOf(ExceptionError.BadRequestException);
    }
  })
});


