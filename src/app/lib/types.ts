export interface PillarProps {
    title: string;
    description: string;
    backgroundImage: string;
  }
  
  export interface MenuButtonProps {
    text: string;
    icon: string;
    onClick?: () => void;
  }
  
  export interface ActionButtonProps {
    text: string;
    icon: string;
    onClick?: () => void;
  }
  
  export interface FooterProps {
    year: number;
    logo: string;
    icon: string;
  }
  
  export interface HeaderProps {
    logo: string;
    menuIcon: string;
  }
  
  export interface HeroProps {
    backgroundImage: string;
  }
  
  export interface MissionProps {
    text: string;
  }

  export interface BrotherCardProps {
    name: string;
    house: string;
    profileImage: string;
  }

  export interface RecruitCardProps {
    name: string;
    house: string;
    profileImage: string;
  }
  
  export interface BrotherYearSectionProps {
    year: string;
    brothers: BrotherCardProps[];
  }

  export interface RecruitYearSectionProps {
    year: string;
    recruits: RecruitCardProps[];
  }