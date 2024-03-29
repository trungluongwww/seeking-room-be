import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, ViewColumn, VirtualColumn } from "typeorm";
import BaseEntity from "./base";
import RoomFile from "./room-file";
import { District, Province, User, Ward } from "./index";
import inconstants from "../../../internal/inconstants";
import RoomConvenience from "./room-convenience";
import Convenience from "./convenience";

@Entity({ name: "rooms" })
@Index(["status", "updatedAt"])
export default class Room extends BaseEntity {
  @Column({ name: "user_id", nullable: false, type: "text" })
  userId: string;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: "user_id" })
  user: User;

  @Column({ name: "name", nullable: false, default: "", type: "text" })
  name: string;

  @Column({ nullable: true, name: "description", type: "text", default: "" })
  description: string;

  @Column({
    nullable: true,
    name: "rent_per_month",
    type: "integer",
    default: 0,
  })
  rentPerMonth: number;

  @Column({
    nullable: true,
    name: "deposit",
    type: "integer",
    default: 0,
  })
  deposit: number;

  @Column({
    nullable: true,
    name: "square_metre",
    type: "integer",
    default: 0,
  })
  squareMetre: number;

  @Column({ name: "province_id", nullable: true, type: "text" })
  provinceId: string;

  @Column({ name: "district_id", nullable: true, type: "text" })
  districtId: string;

  @Column({ name: "ward_id", nullable: true, type: "text" })
  wardId: string;

  @ManyToOne(() => Province, (province) => province.id)
  @JoinColumn({ name: "province_id" })
  province: Province;

  @ManyToOne(() => District, (district) => district.id)
  @JoinColumn({ name: "district_id" })
  district: District;

  @ManyToOne(() => Ward, (ward) => ward.id)
  @JoinColumn({ name: "ward_id" })
  ward: Ward;

  @Column({ name: "address", nullable: false, default: "", type: "text" })
  address: string;

  @Column({ name: "search_text", nullable: false, default: "", type: "text" })
  searchText: string;

  @Column({ name: "status", nullable: false, default: "", type: "text" })
  status: string;

  @Column({ name: "type", nullable: false, default: inconstants.room.type.room, type: "text" })
  type: string;

  @Column({
    name: "recent_active_at",
    nullable: false,
    default: new Date(),
    type: "timestamp with time zone",
  })
  recentActiveAt: Date;

  @OneToMany(() => RoomFile, (roomFile) => roomFile.room)
  files: RoomFile[];

  @OneToMany(() => RoomConvenience, (conv) => conv.room)
  conveniences: RoomConvenience[];

  /*** VIRTUAL COLUMNS ***/
  @VirtualColumn({
    query: (alias) => `SELECT json_build_object('id', "rf"."id", 'info', "rf"."info")
                       FROM "room_files" "rf"
                       WHERE "rf"."room_id" = ${alias}.id
                       ORDER BY "rf"."created_at" DESC LIMIT 1`,
  })
  avatar: RoomFile;
}
