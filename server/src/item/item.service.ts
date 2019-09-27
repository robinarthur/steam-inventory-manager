import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from './entity/item.entity';

@Injectable()
export class ItemService {
  @InjectRepository(Item)
  private readonly itemRepository: Repository<Item>;

  async getAllItems(): Promise<Item[]> {
    return this.itemRepository.find();
  }

  async getItem(classId: string): Promise<Item> {
    return this.itemRepository.findOneOrFail({ classId });
  }

  async createItem(data: CreateItemDto): Promise<Item> {
    const item = new Item(data);
    await this.itemRepository.insert(item);
    return this.getItem(item.name);
  }

  async updateItem(classId: string, data: UpdateItemDto): Promise<Item> {
    await this.itemRepository.update({ classId }, data);
    return this.getItem(classId);
  }

  async deleteItem(classId: string): Promise<void> {
    await this.itemRepository.delete({ classId });
  }
}
