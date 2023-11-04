export const GridLocaleTextES = {
  // Root
  noRowsLabel: 'No hay registro',
  noResultsOverlayLabel: 'No results found.',

  // Density selector toolbar button text
  toolbarDensity: 'Density',
  toolbarDensityLabel: 'Density',
  toolbarDensityCompact: 'Compact',
  toolbarDensityStandard: 'Standard',
  toolbarDensityComfortable: 'Comfortable',

  // Columns selector toolbar button text
  toolbarColumns: 'Columnas',
  toolbarColumnsLabel: 'Select columns',

  // Filters toolbar button text
  toolbarFilters: 'Filtros',
  toolbarFiltersLabel: 'Mostrar filtros',
  toolbarFiltersTooltipHide: 'Ocultar filtros',
  toolbarFiltersTooltipShow: 'Mostrar filtros',
  toolbarFiltersTooltipActive: count => (count !== 1 ? `${count} active filters` : `${count} active filter`),

  // Quick filter toolbar field
  toolbarQuickFilterPlaceholder: 'Buscar…',
  toolbarQuickFilterLabel: 'Buscar',
  toolbarQuickFilterDeleteIconLabel: 'Limpiar',

  // Export selector toolbar button text
  toolbarExport: 'Exportar',
  toolbarExportLabel: 'Exportar',
  toolbarExportCSV: 'Download as CSV',
  toolbarExportPrint: 'Print',
  toolbarExportExcel: 'Download as Excel',

  // Columns panel text
  columnsPanelTextFieldLabel: 'Find column',
  columnsPanelTextFieldPlaceholder: 'Column title',
  columnsPanelDragIconLabel: 'Reorder column',
  columnsPanelShowAllButton: 'Show all',
  columnsPanelHideAllButton: 'Hide all',

  // Filter panel text
  filterPanelAddFilter: 'Add filter',
  filterPanelRemoveAll: 'Remove all',
  filterPanelDeleteIconLabel: 'Delete',
  filterPanelLogicOperator: 'Logic operator',
  filterPanelOperator: 'Operator',
  filterPanelOperatorAnd: 'And',
  filterPanelOperatorOr: 'Or',
  filterPanelColumns: 'Columns',
  filterPanelInputLabel: 'Value',
  filterPanelInputPlaceholder: 'Filter value',

  // Filter operators text
  filterOperatorContains: 'contiene',
  filterOperatorEquals: 'es igual',
  filterOperatorStartsWith: 'comienza con',
  filterOperatorEndsWith: 'termina con',
  filterOperatorIs: 'es',
  filterOperatorNot: 'no es',
  filterOperatorAfter: 'es después',
  filterOperatorOnOrAfter: 'es en o después',
  filterOperatorBefore: 'es antes',
  filterOperatorOnOrBefore: 'es en o antes',
  filterOperatorIsEmpty: 'está vacío',
  filterOperatorIsNotEmpty: 'no está vacío',
  filterOperatorIsAnyOf: 'es cualquiera de',
  'filterOperator=': '=',
  'filterOperator!=': '!=',
  'filterOperator>': '>',
  'filterOperator>=': '>=',
  'filterOperator<': '<',
  'filterOperator<=': '<=',

  // Header filter operators text
  headerFilterOperatorContains: 'contiene',
  headerFilterOperatorEquals: 'es igual',
  headerFilterOperatorStartsWith: 'Comienza con',
  headerFilterOperatorEndsWith: 'Termina con',
  headerFilterOperatorIs: 'Es',
  headerFilterOperatorNot: 'No es',
  headerFilterOperatorAfter: 'Es después',
  headerFilterOperatorOnOrAfter: 'No es o después',
  headerFilterOperatorBefore: 'Es antes',
  headerFilterOperatorOnOrBefore: 'No es o antes',
  headerFilterOperatorIsEmpty: 'Esta vacío',
  headerFilterOperatorIsNotEmpty: 'No está vacío',
  headerFilterOperatorIsAnyOf: 'Es alguno de',
  'headerFilterOperator=': 'Contiene',
  'headerFilterOperator!=': 'No contine',
  'headerFilterOperator>': 'Mas grande que',
  'headerFilterOperator>=': 'Mas grande que o igual a',
  'headerFilterOperator<': 'Menos que',
  'headerFilterOperator<=': 'Menos que o igual a',

  // Filter values text
  filterValueAny: 'cualquiera',
  filterValueTrue: 'verdadero',
  filterValueFalse: 'falso',

  // Column menu text
  columnMenuLabel: 'Menu',
  columnMenuShowColumns: 'Mostrar columnas',
  columnMenuManageColumns: 'Administrar columnas',
  columnMenuFilter: 'Filtro',
  columnMenuHideColumn: 'Ocultar columna',
  columnMenuUnsort: 'Desordenar',
  columnMenuSortAsc: 'Orden ASC',
  columnMenuSortDesc: 'Orden DESC',

  // Column header text
  columnHeaderFiltersTooltipActive: count => (count !== 1 ? `${count} activar filtros` : `${count} activar filtro`),
  columnHeaderFiltersLabel: 'Mostrar filtros',
  columnHeaderSortIconLabel: 'Ordenar',

  // Rows selected footer text
  footerRowSelected: count =>
    count !== 1
      ? `${count.toLocaleString()} registros seleccionados`
      : `${count.toLocaleString()} registro seleccionado`,

  // Total row amount footer text
  footerTotalRows: 'Total de registros:',

  // Total visible row amount footer text
  footerTotalVisibleRows: (visibleCount, totalCount) =>
    `${visibleCount.toLocaleString()} of ${totalCount.toLocaleString()}`,

  // Checkbox selection text
  checkboxSelectionHeaderName: 'Selección de casilla de verificación',
  checkboxSelectionSelectAllRows: 'Seleccionar todos los registros',
  checkboxSelectionUnselectAllRows: 'Deseleccionar todos los registros',
  checkboxSelectionSelectRow: 'Seleccionar fila',
  checkboxSelectionUnselectRow: 'Unselect row',

  // Boolean cell text
  booleanCellTrueLabel: 'si',
  booleanCellFalseLabel: 'no',

  // Actions cell more text
  actionsCellMore: 'mas',

  // Column pinning text
  pinToLeft: 'Pin to left',
  pinToRight: 'Pin to right',
  unpin: 'Unpin',

  // Tree Data
  treeDataGroupingHeaderName: 'Group',
  treeDataExpand: 'see children',
  treeDataCollapse: 'hide children',

  // Grouping columns
  groupingColumnHeaderName: 'Group',
  groupColumn: name => `Group by ${name}`,
  unGroupColumn: name => `Stop grouping by ${name}`,

  // Master/detail
  detailPanelToggle: 'Detail panel toggle',
  expandDetailPanel: 'Expand',
  collapseDetailPanel: 'Collapse',

  // Used core components translation keys
  MuiTablePagination: {},

  // Row reordering text
  rowReorderingHeaderName: 'Row reordering',

  // Aggregation
  aggregationMenuItemHeader: 'Aggregation',
  aggregationFunctionLabelSum: 'sum',
  aggregationFunctionLabelAvg: 'avg',
  aggregationFunctionLabelMin: 'min',
  aggregationFunctionLabelMax: 'max',
  aggregationFunctionLabelSize: 'size'
}
