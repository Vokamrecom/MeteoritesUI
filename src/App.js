import { Layout, Typography } from 'antd';
import './App.css';
import MeteoriteDashboard from './pages/MeteoriteDashboard';

const { Header, Content, Footer } = Layout;
const { Title, Paragraph } = Typography;

const App = () => (
  <Layout className="app-layout">
    <Header className="app-header">
      <Title level={3} className="app-title">
        Meteorites Dashboard
      </Title>
      <Paragraph className="app-subtitle">
        Сводная статистика по падениям метеоритов NASA
      </Paragraph>
    </Header>

    <Content className="app-content">
      <MeteoriteDashboard />
    </Content>

    <Footer className="app-footer">
      © {new Date().getFullYear()} MeteoritesUI — данные NASA Open Data
    </Footer>
  </Layout>
);

export default App;
