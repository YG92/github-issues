import { MatPaginatorIntl } from '@angular/material';

const rangeLabel = (page: number, pageSize: number, length: number) => {
  if (length === 0 || pageSize === 0) { return `0 из ${length}`; }
  length = Math.max(length, 0);
  const startIndex = page * pageSize;
  const endIndex = startIndex < length ?
    Math.min(startIndex + pageSize, length) :
    startIndex + pageSize;
  return `${startIndex + 1} - ${endIndex} из ${length}`;
};

export function russianPaginatorIntl() {
  const paginatorIntl = new MatPaginatorIntl();
  paginatorIntl.itemsPerPageLabel = 'Количество пунктов:';
  paginatorIntl.nextPageLabel = 'Вперед';
  paginatorIntl.previousPageLabel = 'Назад';
  paginatorIntl.getRangeLabel = rangeLabel;
  return paginatorIntl;
}
