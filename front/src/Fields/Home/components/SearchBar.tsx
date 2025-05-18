import { Col, Input, Row } from 'antd';
import { FC } from 'react';

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}
const SearchBar: FC<SearchBarProps> = ({ searchTerm, setSearchTerm }) => {
  const onSearch = (value: string) => {
    if (value.trim()) {
      setSearchTerm(value.trim());
    }
  };

  return (
    <Row justify="center" style={{ padding: '2rem' }}>
      <Col span={24} style={{ maxWidth: 400 }}>
        <Input.Search
          placeholder="Enter a location"
          enterButton="Search"
          size="large"
          onSearch={onSearch}
          defaultValue={searchTerm}
        />
      </Col>
    </Row>
  );
};

export default SearchBar;
