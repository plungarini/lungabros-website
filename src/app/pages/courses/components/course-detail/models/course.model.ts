export interface Course {
  id: string;
  title: string;
  bgImg: string;
  price: number;
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
  }
  gallery: string[];
}