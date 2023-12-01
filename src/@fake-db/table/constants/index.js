/*Traducir*/
import { useTranslation } from 'react-i18next'

export const GridLocaleTextES = () => {
  const { t } = useTranslation()

  return {
    rowsPerPage: t('Rows per page:'),

    //rowsPerPageText: t('Rows per page:'),//es Rows Per Page
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
    toolbarFilters: t('Filtros'),
    toolbarFiltersLabel: 'Mostrar filtros',
    toolbarFiltersTooltipHide: 'Ocultar filtros',
    toolbarFiltersTooltipShow: 'Mostrar filtros',
    toolbarFiltersTooltipActive: count => (count !== 1 ? `${count} active filters` : `${count} active filter`),

    // Quick filter toolbar field
    toolbarQuickFilterPlaceholder: 'Buscar…',
    toolbarQuickFilterLabel: 'Buscar',
    toolbarQuickFilterDeleteIconLabel: 'Limpiar',

    // Export selector toolbar button text
    toolbarExport: t('Export'),
    toolbarExportLabel: 'Exportar',
    toolbarExportCSV: t('Download as CSV'),
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
    filterPanelOperator: t('Operator'),
    filterPanelOperatorAnd: 'And',
    filterPanelOperatorOr: 'Or',
    filterPanelColumns: t('Columns'),
    filterPanelInputLabel: t('Value'),
    filterPanelInputPlaceholder: t('Filter value'),

    // Filter operators text
    filterOperatorContains: t('contains'),
    filterOperatorEquals: t('is equal'),
    filterOperatorStartsWith: t('starts with'),
    filterOperatorEndsWith: t('ends with'),
    filterOperatorIs: 'es',
    filterOperatorNot: 'no es',
    filterOperatorAfter: 'es después',
    filterOperatorOnOrAfter: 'es en o después',
    filterOperatorBefore: 'es antes',
    filterOperatorOnOrBefore: 'es en o antes',
    filterOperatorIsEmpty: t('is empty'),
    filterOperatorIsNotEmpty: t('is not empty'),
    filterOperatorIsAnyOf: t('is any of'),
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
    columnMenuManageColumns: t('Manage columns'),
    columnMenuFilter: t('Filters'),
    columnMenuHideColumn: t('Hide column'),
    columnMenuUnsort: t('Unsort'),
    columnMenuSortAsc: t('Sort ASC'),
    columnMenuSortDesc: t('Sort DESC'),

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
}

export const indicativos = [
  { pais: 'Afganistán', codigo: '+ 93' },
  { pais: 'Albania', codigo: '+ 355' },
  { pais: 'Alemania', codigo: '+ 49' },
  { pais: 'Andorra', codigo: '+ 376' },
  { pais: 'Angola', codigo: '+ 244' },
  { pais: 'Antigua y Barbuda', codigo: '+ 1' },
  { pais: 'Arabia Saudita', codigo: '+ 966' },
  { pais: 'Argelia', codigo: '+ 213' },
  { pais: 'Argentina', codigo: '+ 54' },
  { pais: 'Armenia', codigo: '+ 374' },
  { pais: 'Australia', codigo: '+ 61' },
  { pais: 'Austria', codigo: '+ 43' },
  { pais: 'Azerbaiyán', codigo: '+ 994' },
  { pais: 'Bahamas', codigo: '+ 1' },
  { pais: 'Bangladés', codigo: '+ 880' },
  { pais: 'Barbados', codigo: '+ 1' },
  { pais: 'Baréin', codigo: '+ 973' },
  { pais: 'Bélgica', codigo: '+ 32' },
  { pais: 'Belice', codigo: '+ 501' },
  { pais: 'Benin', codigo: '+ 229' },
  { pais: 'Bielorrusia', codigo: '+ 375' },
  { pais: 'Bolivia', codigo: '+ 591' },
  { pais: 'Bosnia y Herzegovina', codigo: '+ 387' },
  { pais: 'Botsuana', codigo: '+ 267' },
  { pais: 'Brasil', codigo: '+ 55' },
  { pais: 'Brunéi', codigo: '+ 673' },
  { pais: 'Bulgaria', codigo: '+ 359' },
  { pais: 'Burkina Faso', codigo: '+ 226' },
  { pais: 'Burundi', codigo: '+ 257' },
  { pais: 'Bután', codigo: '+ 975' },
  { pais: 'Cabo Verde', codigo: '+ 238' },
  { pais: 'Camboya', codigo: '+ 855' },
  { pais: 'Camerún', codigo: '+ 237' },
  { pais: 'Canadá', codigo: '+ 1' },
  { pais: 'Catar', codigo: '+ 974' },
  { pais: 'Chad', codigo: '+ 235' },
  { pais: 'Chile', codigo: '+ 56' },
  { pais: 'China', codigo: '+ 86' },
  { pais: 'Chipre', codigo: '+ 357' },
  { pais: 'Colombia', codigo: '+ 57' },
  { pais: 'Comoras', codigo: '+ 269' },
  { pais: 'Corea del Norte', codigo: '+ 850' },
  { pais: 'Corea del Sur', codigo: '+ 82' },
  { pais: 'Costa de Marfil', codigo: '+ 225' },
  { pais: 'Costa Rica', codigo: '+ 506' },
  { pais: 'Croacia', codigo: '+ 385' },
  { pais: 'Cuba', codigo: '+ 53' },
  { pais: 'Dinamarca', codigo: '+ 45' },
  { pais: 'Dominica', codigo: '+ 1' },
  { pais: 'Ecuador', codigo: '+ 593' },
  { pais: 'Egipto', codigo: '+ 20' },
  { pais: 'El Salvador', codigo: '+ 503' },
  { pais: 'Emiratos Árabes Unidos', codigo: '+ 971' },
  { pais: 'Eritrea', codigo: '+ 291' },
  { pais: 'Eslovaquia', codigo: '+ 421' },
  { pais: 'Eslovenia', codigo: '+ 386' },
  { pais: 'España', codigo: '+ 34' },
  { pais: 'Estados Unidos', codigo: '+ 1' },
  { pais: 'Estonia', codigo: '+ 372' },
  { pais: 'Etiopía', codigo: '+ 251' },
  { pais: 'Fiji', codigo: '+ 679' },
  { pais: 'Filipinas', codigo: '+ 63' },
  { pais: 'Finlandia', codigo: '+ 358' },
  { pais: 'Francia', codigo: '+ 33' },
  { pais: 'Gabón', codigo: '+ 241' },
  { pais: 'Gambia', codigo: '+ 220' },
  { pais: 'Georgia', codigo: '+ 995' },
  { pais: 'Ghana', codigo: '+ 233' },
  { pais: 'Granada', codigo: '+ 1' },
  { pais: 'Grecia', codigo: '+ 30' },
  { pais: 'Guatemala', codigo: '+ 502' },
  { pais: 'Guinea', codigo: '+ 224' },
  { pais: 'Guinea Ecuatorial', codigo: '+ 240' },
  { pais: 'Guinea-Bisáu', codigo: '+ 245' },
  { pais: 'Guyana', codigo: '+ 592' },
  { pais: 'Haití', codigo: '+ 509' },
  { pais: 'Honduras', codigo: '+ 504' },
  { pais: 'Hungría', codigo: '+ 36' },
  { pais: 'India', codigo: '+ 91' },
  { pais: 'Indonesia', codigo: '+ 62' },
  { pais: 'Irak', codigo: '+ 964' },
  { pais: 'Irán', codigo: '+ 98' },
  { pais: 'Irlanda', codigo: '+ 353' },
  { pais: 'Islandia', codigo: '+ 354' },
  { pais: 'Islas Marshall', codigo: '+ 692' },
  { pais: 'Islas Salomón', codigo: '+ 677' },
  { pais: 'Israel', codigo: '+ 972' },
  { pais: 'País', codigo: '+ Código del País' },
  { pais: 'Italia', codigo: '+ 39' },
  { pais: 'Jamaica', codigo: '+ 1' },
  { pais: 'Japón', codigo: '+ 81' },
  { pais: 'Jordania', codigo: '+ 962' },
  { pais: 'Kazajistán', codigo: '+ 7' },
  { pais: 'Kenia', codigo: '+ 254' },
  { pais: 'Kirguistán', codigo: '+ 996' },
  { pais: 'Kiribati', codigo: '+ 686' },
  { pais: 'Kuwait', codigo: '+ 965' },
  { pais: 'Laos', codigo: '+ 856' },
  { pais: 'Lesoto', codigo: '+ 266' },
  { pais: 'Letonia', codigo: '+ 371' },
  { pais: 'Líbano', codigo: '+ 961' },
  { pais: 'Liberia', codigo: '+ 231' },
  { pais: 'Libia', codigo: '+ 218' },
  { pais: 'Liechtenstein', codigo: '+ 423' },
  { pais: 'Lituania', codigo: '+ 370' },
  { pais: 'Luxemburgo', codigo: '+ 352' },
  { pais: 'Macedonia', codigo: '+ 389' },
  { pais: 'Madagascar', codigo: '+ 261' },
  { pais: 'Malasia', codigo: '+ 60' },
  { pais: 'Malaui', codigo: '+ 265' },
  { pais: 'Maldivas', codigo: '+ 960' },
  { pais: 'Malí', codigo: '+ 223' },
  { pais: 'Malta', codigo: '+ 356' },
  { pais: 'Marruecos', codigo: '+ 212' },
  { pais: 'Mauricio', codigo: '+ 230' },
  { pais: 'Mauritania', codigo: '+ 222' },
  { pais: 'México', codigo: '+ 52' },
  { pais: 'Micronesia', codigo: '+ 691' },
  { pais: 'Moldavia', codigo: '+ 373' },
  { pais: 'Mónaco', codigo: '+ 377' },
  { pais: 'Mongolia', codigo: '+ 976' },
  { pais: 'Montenegro', codigo: '+ 382' },
  { pais: 'Mozambique', codigo: '+ 258' },
  { pais: 'Myanmar', codigo: '+ 95' },
  { pais: 'Namibia', codigo: '+ 264' },
  { pais: 'Nauru', codigo: '+ 674' },
  { pais: 'Nepal', codigo: '+ 977' },
  { pais: 'Nicaragua', codigo: '+ 505' },
  { pais: 'Niger', codigo: '+ 227' },
  { pais: 'Nigeria', codigo: '+ 234' },
  { pais: 'Noruega', codigo: '+ 47' },
  { pais: 'Nueva Zelanda', codigo: '+ 64' },
  { pais: 'Omán', codigo: '+ 968' },
  { pais: 'Países Bajos', codigo: '+ 31' },
  { pais: 'Pakistán', codigo: '+ 92' },
  { pais: 'Palaos', codigo: '+ 680' },
  { pais: 'Panamá', codigo: '+ 507' },
  { pais: 'Papúa Nueva Guinea', codigo: '+ 675' },
  { pais: 'Paraguay', codigo: '+ 595' },
  { pais: 'Perú', codigo: '+ 51' },
  { pais: 'Polonia', codigo: '+ 48' },
  { pais: 'Portugal', codigo: '+ 351' },
  { pais: 'Reino Unido', codigo: '+ 44' },
  { pais: 'República Centroafricana', codigo: '+ 236' },
  { pais: 'República Checa', codigo: '+ 420' },
  { pais: 'República del Congo', codigo: '+ 242' },
  { pais: 'República Democratica del Congo', codigo: '+ 243' },
  { pais: 'República Dominicana', codigo: '+ 1' },
  { pais: 'Ruanda', codigo: '+ 250' },
  { pais: 'Rumania', codigo: '+ 40' },
  { pais: 'Rusia', codigo: '+ 7' },
  { pais: 'Samoa', codigo: '+ 685' },
  { pais: 'San Cristóbal y Nieves', codigo: '+ 1' },
  { pais: 'San Marino', codigo: '+ 378' },
  { pais: 'San Vicente y las Granadinas', codigo: '+ 1' },
  { pais: 'Santa Lucía', codigo: '+ 1' },
  { pais: 'Santo Tomé y Príncipe', codigo: '+ 239' },
  { pais: 'Senegal', codigo: '+ 221' },
  { pais: 'Serbia', codigo: '+ 381' },
  { pais: 'Seychelles', codigo: '+ 248' },
  { pais: 'Sierra Leona', codigo: '+ 232' },
  { pais: 'Singapur', codigo: '+ 65' },
  { pais: 'Siria', codigo: '+ 963' },
  { pais: 'Somalia', codigo: '+ 252' },
  { pais: 'Sri Lanka', codigo: '+ 94' },
  { pais: 'Suazilandia', codigo: '+ 268' },
  { pais: 'Sudáfrica', codigo: '+ 27' },
  { pais: 'Sudán', codigo: '+ 249' },
  { pais: 'Sudán del Sur', codigo: '+ 211' },
  { pais: 'Suecia', codigo: '+ 46' },
  { pais: 'Suiza', codigo: '+ 41' },
  { pais: 'Surinam', codigo: '+ 597' },
  { pais: 'Tailandia', codigo: '+ 66' },
  { pais: 'Tanzania', codigo: '+ 255' },
  { pais: 'Tayikistán', codigo: '+ 992' },
  { pais: 'Timor Oriental', codigo: '+ 670' },
  { pais: 'Togo', codigo: '+ 228' },
  { pais: 'Tonga', codigo: '+ 676' },
  { pais: 'Trinidad y Tobago', codigo: '+ 1' },
  { pais: 'Túnez', codigo: '+ 216' },
  { pais: 'Turkmenistán', codigo: '+ 993' },
  { pais: 'Turquía', codigo: '+ 90' },
  { pais: 'Tuvalu', codigo: '+ 688' },
  { pais: 'Ucrania', codigo: '+ 380' },
  { pais: 'Uganda', codigo: '+ 256' },
  { pais: 'Uruguay', codigo: '+ 598' },
  { pais: 'Uzbekistán', codigo: '+ 998' },
  { pais: 'Vanuatu', codigo: '+ 678' },
  { pais: 'Venezuela', codigo: '+ 58' },
  { pais: 'Vietnam', codigo: '+ 84' },
  { pais: 'Yemen', codigo: '+ 967' },
  { pais: 'Yibuti', codigo: '+ 253' },
  { pais: 'Zambia', codigo: '+ 260' },
  { pais: 'Zimbabue', codigo: '+ 263' }
]

export const handleValid = email => {
  let msn = ''

  const isValidEmail =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  if (email === '') {
    msn = email.required || 'Please enter email'
  } else if (!isValidEmail.test(email)) {
    msn = email.validEmail || 'Please enter a valid email address'
  }

  return msn
}
