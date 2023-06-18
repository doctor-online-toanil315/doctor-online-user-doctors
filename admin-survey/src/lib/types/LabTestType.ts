export interface BaseLabTest {
  name: string;
  image: string;
  descriptions: string;
  useFor: string;
}

export interface LabTest extends BaseLabTest {
  id: string;
  isActive: boolean;
}

export interface CreateLabTest extends BaseLabTest {}

export interface UpdateLabTest extends BaseLabTest {
  id: string;
}
