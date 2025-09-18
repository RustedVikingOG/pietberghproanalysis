import { GraduationCap, CheckCircle2, Zap } from 'lucide-vue-next';
import { credentials, type Credential } from '@/models/achievements/AchievementCredential';

export function useAchievementCredentials() {
  const getCredentials = (): Credential[] => {
    return credentials;
  };

  const getCredentialsWithIcons = (): (Credential & { iconComponent: any })[] => {
    return credentials.map(credential => ({
      ...credential,
      iconComponent: replaceIcon(credential.icon)
    }));
  };

  const replaceIcon = (iconName: string) => {
    const iconMap: Record<string, any> = {
      GraduationCap,
      CheckCircle2,
      Zap,
    };
    return iconMap[iconName] || null;
  };


  return {
    getCredentials,
    getCredentialsWithIcons,
    replaceIcon,
  };
}