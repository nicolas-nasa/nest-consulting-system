import { BaseEntity } from '@/entities/base.entity';
import { EnterprisesEntity } from '@/enterprises/entities/enterprises.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { UUID } from 'crypto';

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity {
  @Column({ type: 'uuid', unique: true })
  id: string;
  @Column({ name: 'nome', type: 'varchar' })
  nome: string;
  @Column({ name: 'cpf', type: 'varchar', unique: true })
  cpf: string;
  @Column({ name: 'rg', type: 'varchar', unique: true })
  rg: string;
  @Column({ name: 'data_nascimento', type: 'date' })
  data_nascimento: Date;
  @Column({nullable: true, name: 'email', type: 'varchar'  })
  email?: string;
  @Column({ nullable: true, name: 'telefone', type: 'varchar' })
  telefone?: string;
  @Column({ name: 'endereco', type: 'varchar' })
  endereco: string;
  @Column({ name: 'setor', type: 'varchar' })
  setor: string;
  @Column({ name: 'cargo', type: 'varchar' })
  cargo: string;

  @ManyToOne(() => EnterprisesEntity, (enterprise) => enterprise.id)
  enterprise: EnterprisesEntity;
}
