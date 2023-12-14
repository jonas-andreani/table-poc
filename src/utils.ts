import { faker } from '@faker-js/faker'

export function parseCSVToObject(csvText: string): any[] {
  const lines = csvText.split("\n");
  const headers = lines[0].split(",");

  return lines.slice(1).map((line) => {
    const values = line.split(",");
    const obj: any = {};

    headers.forEach((header, index) => {
      // Remove any leading/trailing whitespaces
      const key = header.trim();
      const value = values[index].trim();

      // Convert numeric values to numbers
      obj[key] = isNaN(Number(value)) ? value : Number(value);
    });

    return obj;
  });
}


// Tanstack

export type Person = {
  firstName: string
  lastName: string
  age: number
  visits: number
  progress: number
  status: 'relationship' | 'complicated' | 'single'
  subRows?: Person[]
}

const range = (len: number) => {
  const arr = []
  for (let i = 0; i < len; i++) {
    arr.push(i)
  }
  return arr
}

const newPerson = (): Person => {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    age: faker.number.int(40),
    visits: faker.number.int(1000),
    progress: faker.number.int(100),
    status: faker.helpers.shuffle<Person['status']>([
      'relationship',
      'complicated',
      'single',
    ])[0]!,
  }
}

export function makeData(...lens: number[]) {
  const makeDataLevel = (depth = 0): Person[] => {
    const len = lens[depth]!
    return range(len).map((d): Person => {
      return {
        ...newPerson(),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      }
    })
  }

  return makeDataLevel()
}