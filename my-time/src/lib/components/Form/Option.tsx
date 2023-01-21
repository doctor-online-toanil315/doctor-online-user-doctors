import { CheckIcon, Title } from '@nexthcm/components';
import { Row } from 'antd';
import { StyledOption, AvatarItem, ImageNameItem } from './styles';
import { useGetFileStoreQuery } from '../../services';

export interface OptionProps {
  employee: any;
  selectedEmployee: string;
}

const Option = (props: OptionProps) => {
  const { employee, selectedEmployee } = props;

  const { data: dataImg } = useGetFileStoreQuery(
    { subPath: employee.image },
    {
      skip: !employee
    }
  );

  const getFirstLetter = (name: string): string => {
    const arr = name.split(' ');
    return arr[arr.length - 1][0];
  };

  return (
    <StyledOption>
      <Row className="option">
        {employee.image ? (
          <AvatarItem src={dataImg} />
        ) : (
          <ImageNameItem>{getFirstLetter(employee.name)}</ImageNameItem>
        )}
        <Row className="option__info">
          <Title level={5}>{employee.name}</Title>
          <span className="employee-username">({employee.username})</span>
        </Row>
        <span>{selectedEmployee === employee.id ? <CheckIcon></CheckIcon> : <div></div>}</span>
      </Row>
    </StyledOption>
  );
};

export default Option;
