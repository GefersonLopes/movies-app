import { differenceInYears, parseISO, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export const getAge = (text: string): number => {
  const age = text ? differenceInYears(new Date(), text) : 0;

  return age;
};

export const coverteDate = (text: string): string => {
  if (!text) return 'N/A';
  const parsedDate = parseISO(text);
  return format(parsedDate, "dd 'de' MMMM 'de' yyyy", {
    locale: ptBR,
  });
};

export const convertYear = (text: string): string => {
  if (!text) return 'N/A';
  const parsedDate = parseISO(text);
  return format(parsedDate, 'yyyy', {
    locale: ptBR,
  });
};
