import { JwtService } from '@nestjs/jwt/dist/jwt.service';
import { Test, TestingModule } from '@nestjs/testing';
import { Sequelize } from 'sequelize-typescript';
import { GroupRepository } from '../repository/group.repository';
import { GroupService } from '../services/group.service';
import { GroupController } from './group.controller';
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';
import { CreateGroupDto } from '../dto/create-group.dto';

const moduleMocker = new ModuleMocker(global);
enum ExceptionError{
    BadRequestException="Bad Request"
    
}
const groupDto={
    name: 'user',
    permissions: ['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES'],
} as CreateGroupDto
const groupMock={
    id: 'c8b66457-1234-4c4d-8dae-267ae1232346',
    name: 'user',
    permissions: ['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES'],
   
}
const groups =[groupMock]

describe('GroupController', () => {
  let controller: GroupController;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [GroupController],
    })
    .useMocker((token)=>{
        if(token===GroupService){
          
            return { 
                addUsersToGroup:jest.fn().mockResolvedValue(undefined),
                create:jest.fn().mockResolvedValue(groupMock),
                findAll: jest.fn().mockResolvedValue(groups),
                findOne:jest.fn().mockResolvedValue(groupMock),
                update:jest.fn().mockResolvedValue(groupMock),
                remove:jest.fn().mockResolvedValue(undefined)
            };
        }
        if (typeof token === 'function') {
            const mockMetadata = moduleMocker.getMetadata(token) as MockFunctionMetadata<any, any>;
            const Mock = moduleMocker.generateFromMetadata(mockMetadata);
            return new Mock();
          }
    })
    .compile();

    controller = moduleRef.get(GroupController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

    it("should be return all groups",async ()=>{
        expect.assertions(1)
        try{
            expect(await controller.findAll()).toEqual(groups)
        }catch(error){
            expect(error).toBeInstanceOf(ExceptionError.BadRequestException);
            expect(error).toHaveProperty('status', 400);
        }
   
    })

 
      it("should create new group",async ()=>{
        expect.assertions(1)
        try{
            expect(await controller.create(groupDto)).toEqual(groupMock)
        }catch(error){
            expect(error).toBeInstanceOf(ExceptionError.BadRequestException);
        }
       
      })
   
        it("should return group by id", async()=>{
            expect.assertions(1)
            try{
                expect(await controller.findOne(groupMock.id)).toEqual(groupMock)
            }catch(error){
                expect(error).toBeInstanceOf(ExceptionError.BadRequestException);
            }
          })
 
          it("should return updated group", async ()=>{
            expect.assertions(1)
            try{
                expect(await controller.update(groupMock.id,groupDto)).toEqual(groupMock)
            }catch(error){
                expect(error).toBeInstanceOf(ExceptionError.BadRequestException);
            }
          })

          it("should delete group", async()=>{
            expect.assertions(1)
            try{
                expect(await controller.remove(groupMock.id)).toEqual(undefined)
            }catch(error){
                expect(error).toBeInstanceOf(ExceptionError.BadRequestException);
            }
          })
          it("should add user to group", async()=>{
            expect.assertions(1)
          
                expect(await controller.addUsersToGroup(groupMock.id,{userIds:["123"]})).toEqual(undefined)
            
          })
 
});
