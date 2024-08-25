import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';



@Injectable()
export class UsersService {

  private users = [
    { id: 1, name: "hadi", role: "Intern" },
    { id: 2, name: "ali", role: "Enginner" },
    { id: 3, name: "abbas", role: "Enginner" },
    { id: 4, name: "hussain", role: "Intern" },
    { id: 5, name: "ali", role: "Admin" },
    { id: 6, name: "Moosa", role: "Admin" },
  ];


  findAll(role?: 'Intern' | 'Engineer' | 'Admin') {
    if (role) {
      const itsArr = this.users.filter(i => i.role === role);

      if (itsArr.length === 0) throw new NotFoundException("Not Found Array");

      return itsArr
    }



    return this.users;
  }


  findOne(id: number) {
    const user = this.users.find(i => i.id === id);
    if (!user) {
      throw new NotFoundException("User not found")
    }


    return user;
  }

  create(user: CreateUserDTO) {
    const usersByHighestId = this.users.length;

    const newUser = {
      id: usersByHighestId + 1,
      ...user
    };

    this.users.push(newUser);
    return newUser;
  }

  update(id: number, updateUser: UpdateUserDto) {
    this.users = this.users.map(i => {
      if (i.id === id) {
        return { ...i, ...updateUser };
      }

      return i;
    })

    return this.findOne(id)
  }


  delete(id: number) {
    const removeUser = this.findOne(id);
    this.users = this.users.filter(i => i.id !== id);
    return removeUser;
  }


}
