import { BaseEntity } from '@/entities/base.entity';
import { UserEntity } from '@/users/entities/user.entity';
import { UUID } from 'crypto';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

@Entity({ name: 'enterprises' })
export class EnterprisesEntity extends BaseEntity {
  @Column({ type: 'uuid' })
  id: UUID;
  @Column({ type: 'varchar' })
  cnpj: string;

  @OneToMany(() => UserEntity, (user) => user.enterprise)
  users: UserEntity[];
}
