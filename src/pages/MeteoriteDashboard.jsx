import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Col, Row, Space, Spin } from 'antd';
import FiltersForm from '../components/FiltersForm';
import SummaryTable from '../components/SummaryTable';
import ErrorAlert from '../components/ErrorAlert';
import { fetchFilters, fetchSummary } from '../api/meteorites';

const defaultFilters = {
  yearFrom: undefined,
  yearTo: undefined,
  recclass: undefined,
  namePart: '',
  sortField: 'year',
  sortOrder: 'asc',
};

const MeteoriteDashboard = () => {
  const [filters, setFilters] = useState(defaultFilters);

  const filtersQuery = useQuery({
    queryKey: ['filters'],
    queryFn: fetchFilters,
    staleTime: 1000 * 60 * 30,
  });

  const summaryQuery = useQuery({
    queryKey: ['summary', filters],
    queryFn: () => fetchSummary(filters),
    keepPreviousData: true,
  });

  const totals = useMemo(
    () => ({
      totalCount: summaryQuery.data?.totalCount ?? 0,
      totalMass: summaryQuery.data?.totalMass ?? 0,
    }),
    [summaryQuery.data],
  );

  const handleFiltersChange = (nextValues) => {
    setFilters((prev) => ({
      ...prev,
      ...nextValues,
    }));
  };

  const handleSortChange = (field, order) => {
    setFilters((prev) => ({
      ...prev,
      sortField: field,
      sortOrder: order === 'descend' ? 'desc' : 'asc',
    }));
  };

  const handleReset = () => {
    setFilters(defaultFilters);
  };

  if (filtersQuery.isLoading) {
    return (
      <div className="dashboard-loader">
        <Spin size="large" />
      </div>
    );
  }

  if (filtersQuery.isError) {
    return (
      <ErrorAlert
        message="Не удалось загрузить фильтры"
        description={filtersQuery.error?.message}
        onRetry={filtersQuery.refetch}
      />
    );
  }

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <FiltersForm
        filters={filters}
        metadata={filtersQuery.data}
        loading={summaryQuery.isLoading}
        onChange={handleFiltersChange}
        onReset={handleReset}
      />

      {summaryQuery.isError ? (
        <ErrorAlert
          message="Не удалось загрузить сводку"
          description={summaryQuery.error?.message}
          onRetry={summaryQuery.refetch}
        />
      ) : (
        <Row>
          <Col span={24}>
            <SummaryTable
              data={summaryQuery.data?.items}
              totals={totals}
              loading={summaryQuery.isLoading}
              fetching={summaryQuery.isFetching}
              sortField={filters.sortField}
              sortOrder={filters.sortOrder}
              onSortChange={handleSortChange}
            />
          </Col>
        </Row>
      )}
    </Space>
  );
};

export default MeteoriteDashboard;

