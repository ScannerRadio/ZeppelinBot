import { PersistedData } from "./entities/PersistedData";
import { BaseGuildRepository } from "./BaseGuildRepository";
import { getRepository, Repository } from "typeorm";

export interface IPartialPersistData {
  roles?: string[];
  nickname?: string;
  is_voice_muted?: boolean;
}

export class GuildPersistedData extends BaseGuildRepository {
  private persistedData: Repository<PersistedData>;

  constructor(guildId) {
    super(guildId);
    this.persistedData = getRepository(PersistedData);
  }

  async find(userId: string) {
    return this.persistedData.findOne({
      where: {
        guild_id: this.guildId,
        user_id: userId,
      },
    });
  }

  async set(userId: string, data: IPartialPersistData = {}) {
    const finalData: any = {};
    if (data.roles) finalData.roles = data.roles.join(",");
    if (data.nickname) finalData.nickname = data.nickname;
    if (data.is_voice_muted != null) finalData.is_voice_muted = data.is_voice_muted ? 1 : 0;

    const existing = await this.find(userId);
    if (existing) {
      await this.persistedData.update(
        {
          guild_id: this.guildId,
          user_id: userId,
        },
        finalData,
      );
    } else {
      await this.persistedData.insert({
        ...finalData,
        guild_id: this.guildId,
        user_id: userId,
      });
    }
  }

  async clear(userId: string) {
    await this.persistedData.delete({
      guild_id: this.guildId,
      user_id: userId,
    });
  }
}
