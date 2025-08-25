import { GymniaEssayThemes } from './model';

export interface GymniaEssayThemesRepository {
    getThemes(): Promise<GymniaEssayThemes[]>;
    getThemeById(id: number): Promise<GymniaEssayThemes | undefined>;
}

export class GymniaEssayThemesImplementation implements GymniaEssayThemesRepository {
  async getThemes(): Promise<GymniaEssayThemes[] | []> {
    return GymniaEssayThemes.query();
  }

  async getThemeById(id: number): Promise<GymniaEssayThemes | undefined> {
    return GymniaEssayThemes.query().findById(id);
  }
}
