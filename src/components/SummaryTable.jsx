import { Card, Skeleton, Table, Typography } from 'antd';
import { useMemo } from 'react';

const { Text } = Typography;

const SummaryTable = ({
  data,
  totals,
  loading,
  fetching,
  sortField,
  sortOrder,
  onSortChange,
}) => {
  const getSortOrder = (field) =>
    sortField === field ? (sortOrder === 'asc' ? 'ascend' : 'descend') : null;

  const columns = useMemo(
    () => [
      {
        title: 'Год',
        dataIndex: 'year',
        sorter: true,
        sortOrder: getSortOrder('year'),
      },
      {
        title: 'Количество метеоритов',
        dataIndex: 'count',
        sorter: true,
        sortOrder: getSortOrder('count'),
      },
      {
        title: 'Суммарная масса (г)',
        dataIndex: 'totalMass',
        sorter: true,
        sortOrder: getSortOrder('mass'),
        render: (value) => value.toLocaleString('ru-RU', { maximumFractionDigits: 2 }),
      },
    ],
    [sortField, sortOrder],
  );

  const tableData = useMemo(
    () => data?.map((item) => ({ key: item.year, ...item })) ?? [],
    [data],
  );

  const handleChange = (_, __, sorter) => {
    if (!sorter.order) {
      onSortChange('year', 'ascend');
      return;
    }

    const nextField =
      sorter.field === 'totalMass'
        ? 'mass'
        : sorter.field === 'count'
        ? 'count'
        : 'year';

    onSortChange(nextField, sorter.order);
  };

  return (
    <Card>
      {loading ? (
        <Skeleton active />
      ) : (
        <Table
          dataSource={tableData}
          columns={columns}
          pagination={{ pageSize: 10 }}
          loading={fetching}
          onChange={handleChange}
          summary={() => (
            <Table.Summary.Row>
              <Table.Summary.Cell index={0}>
                <Text strong>Итого</Text>
              </Table.Summary.Cell>
              <Table.Summary.Cell index={1}>
                <Text strong>{totals.totalCount?.toLocaleString('ru-RU')}</Text>
              </Table.Summary.Cell>
              <Table.Summary.Cell index={2}>
                <Text strong>
                  {totals.totalMass?.toLocaleString('ru-RU', {
                    maximumFractionDigits: 2,
                  })}
                </Text>
              </Table.Summary.Cell>
            </Table.Summary.Row>
          )}
        />
      )}
    </Card>
  );
};

export default SummaryTable;

