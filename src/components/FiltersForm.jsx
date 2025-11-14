import { Button, Card, Col, Form, Input, Row, Select, Space, Typography } from 'antd';
import { useEffect, useMemo } from 'react';

const { Title } = Typography;

const FiltersForm = ({ filters, metadata, loading, onChange, onReset }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(filters);
  }, [filters, form]);

  const yearOptions = useMemo(() => {
    if (!metadata?.minYear || !metadata?.maxYear) {
      return [];
    }

    const options = [];
    for (let year = metadata.maxYear; year >= metadata.minYear; year -= 1) {
      options.push({ value: year, label: year });
    }
    return options;
  }, [metadata]);

  const recclassOptions = useMemo(
    () =>
      (metadata?.recclasses ?? []).map((recclass) => ({
        label: recclass,
        value: recclass,
      })),
    [metadata],
  );

  const handleValuesChange = (_, allValues) => {
    onChange(allValues);
  };

  return (
    <Card>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Row justify="space-between" align="middle">
          <Col>
            <Title level={4} style={{ margin: 0 }}>
              Фильтры
            </Title>
          </Col>
          <Col>
            <Button type="link" onClick={onReset}>
              Сбросить
            </Button>
          </Col>
        </Row>

        <Form
          form={form}
          layout="vertical"
          onValuesChange={handleValuesChange}
          initialValues={filters}
          disabled={loading}
        >
          <Row gutter={16}>
            <Col xs={24} md={12} lg={6}>
              <Form.Item name="yearFrom" label="Год с">
                <Select
                  allowClear
                  showSearch
                  placeholder="Выберите год"
                  options={yearOptions}
                  filterOption={(input, option) =>
                    option?.label?.toString().includes(input)
                  }
                />
              </Form.Item>
            </Col>

            <Col xs={24} md={12} lg={6}>
              <Form.Item name="yearTo" label="Год по">
                <Select
                  allowClear
                  showSearch
                  placeholder="Выберите год"
                  options={yearOptions}
                  filterOption={(input, option) =>
                    option?.label?.toString().includes(input)
                  }
                />
              </Form.Item>
            </Col>

            <Col xs={24} md={12} lg={6}>
              <Form.Item name="recclass" label="Класс метеорита">
                <Select
                  allowClear
                  showSearch
                  placeholder="Все классы"
                  options={recclassOptions}
                  filterOption={(input, option) =>
                    option?.label?.toLowerCase().includes(input.toLowerCase())
                  }
                />
              </Form.Item>
            </Col>

            <Col xs={24} md={12} lg={6}>
              <Form.Item name="namePart" label="Часть названия">
                <Input allowClear placeholder="Например, 'Agen'" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Space>
    </Card>
  );
};

export default FiltersForm;

