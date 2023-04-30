import Entity from "../../core/entities/entity";

interface StudentProps {
  name: string;
}

export default class Student extends Entity<StudentProps> {}
