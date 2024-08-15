import { parse, differenceInYears } from 'date-fns';
import { ptBR } from 'date-fns/locale';

function extractBirthDate(text: string) {
  const regex = /\d{1,2} de [a-z]+ de \d{4}/i;
  const match = text.match(regex);
  return match ? match[0] : null;
}

export const getAge = (text: string): number => {
  const birthDateStr = extractBirthDate(text);

  const birthDate = birthDateStr
    ? parse(birthDateStr, "d 'de' MMMM 'de' yyyy", new Date(), { locale: ptBR })
    : null;

  const age = birthDate ? differenceInYears(new Date(), birthDate) : 0;

  return age;
};
