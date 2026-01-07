import { AIContext, Mission, CompletedMission } from '../types';

export function recommendNextMission(
  context: AIContext,
  allMissions: Mission[]
): Mission | null {
  // Filter out already completed missions
  const completedMissionIds = new Set(
    context.completedMissions.map(mission => mission.missionId)
  );
  
  const availableMissions = allMissions.filter(
    mission => !completedMissionIds.has(mission.id)
  );
  
  if (availableMissions.length === 0) {
    return null; // No missions left to recommend
  }
  
  // Prioritize missions matching difficulty preference
  const preferredDifficultyMissions = availableMissions.filter(
    mission => mission.difficulty === context.difficultyPreference
  );
  
  if (preferredDifficultyMissions.length > 0) {
    // Return a random mission with preferred difficulty
    const randomIndex = Math.floor(Math.random() * preferredDifficultyMissions.length);
    return preferredDifficultyMissions[randomIndex];
  }
  
  // If no preferred difficulty missions, return a random available mission
  const randomIndex = Math.floor(Math.random() * availableMissions.length);
  return availableMissions[randomIndex];
}

export function generateParentReport(
  context: AIContext
): {
  progressPercent: number;
  strengths: string[];
  improvementAreas: string[];
} {
  const totalPossibleXP = 10000; // Assumption for max XP possible
  const progressPercent = Math.min(100, Math.round((context.xp / totalPossibleXP) * 100));
  
  // Analyze completed missions to identify patterns
  const completedMissions = context.completedMissions;
  const totalCompleted = completedMissions.length;
  
  // Determine strengths based on difficulty completion
  const difficultyCounts = {
    easy: 0,
    medium: 0,
    hard: 0
  };
  
  let totalScore = 0;
  let totalAttempts = 0;
  
  completedMissions.forEach(mission => {
    // We would need to link mission ID to actual mission to get difficulty
    // For now, we'll return generic strengths
    totalScore += mission.score;
    totalAttempts += mission.attempts;
  });
  
  const avgScore = totalCompleted > 0 ? totalScore / totalCompleted : 0;
  const avgAttempts = totalCompleted > 0 ? totalAttempts / totalCompleted : 0;
  
  // Determine strengths and improvement areas based on performance
  const strengths = [];
  const improvementAreas = [];
  
  if (avgScore >= 80) {
    strengths.push("Alto desempenho nas missões");
  } else {
    improvementAreas.push("Melhorar desempenho nas missões");
  }
  
  if (avgAttempts <= 2) {
    strengths.push("Eficiência na resolução de missões");
  } else {
    improvementAreas.push("Reduzir número de tentativas por missão");
  }
  
  if (totalCompleted > 10) {
    strengths.push("Consistência na realização de missões");
  } else {
    improvementAreas.push("Aumentar a consistência nas missões");
  }
  
  return {
    progressPercent,
    strengths: strengths.length > 0 ? strengths : ["Desempenho consistente"],
    improvementAreas: improvementAreas.length > 0 ? improvementAreas : ["Continuar o bom trabalho"]
  };
}