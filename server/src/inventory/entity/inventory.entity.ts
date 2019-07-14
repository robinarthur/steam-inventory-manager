import { AfterLoad, BeforeInsert, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Column } from 'typeorm/decorator/columns/Column';
import { Bot } from '../../bot/entity/bot.entity';
import { InventoryItem } from './inventory-item.entity';

@Entity()
export class Inventory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  appId: number;

  @Column()
  contextId: number;

  @ManyToOne(() => Bot, bot => bot.inventories, { nullable: false, onDelete: 'CASCADE' })
  bot: Bot;

  @OneToMany(() => InventoryItem, item => item.inventory, { cascade: true })
  items: InventoryItem[];

  count: number;
  worth: number;

  @AfterLoad()
  setCountAndWorth() {
    if (this.items) {
      this.worth = this.items.map(invItem => invItem.quantity).reduce((a, b) => a + b, 0);
      this.count = this.items.map(invItem => (invItem.quantity * invItem.item.price) || 0).reduce((a, b) => a + b, 0);
    }
  }

  botSteamId: string;

  @BeforeInsert()
  setBot() {
    this.bot = new Bot({ steamId: this.botSteamId });
  }

  constructor(partial: Partial<Inventory> = {}) {
    Object.assign(this, partial);
  }

}
