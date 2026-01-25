export class LevelManager {
  private static currentLevel: number = 1;
  
  public static getCurrentLevel(): number {
    return this.currentLevel;
  }
  
  public static setLevel(level: number): void {
    this.currentLevel = level;
  }
  
  public static nextLevel(): void {
    this.currentLevel++;
  }
  
  public static getGoalForLevel(level: number): number {
    const baseGoal = 500;
    return baseGoal + (level - 1) * 200;
  }
  
  public static getCurrentGoal(): number {
    return this.getGoalForLevel(this.currentLevel);
  }
  
  public static reset(): void {
    this.currentLevel = 1;
  }
}
