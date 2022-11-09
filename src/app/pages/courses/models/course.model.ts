export interface Course {
  id: string;
  title: string;
  bgImg: string;
  price: number;
  shortDesc: string;
  category: string[];
  desc: string;
  howToCert: string;
  howToLearn: {
    eLearning: string;
    inPerson: string;
  };
  specs: {
    specs: {
      time: string;
      elearningTime: string;
      dives: number;
      depth: number;
      age: number;
      pre: string;
    },
    foryou: string[];
    learnto: string[];
  };
  courseAdvice?: string[];
  suggestedCourse?: string[];
  gallery: string[];
}