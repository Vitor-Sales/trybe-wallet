import { useDispatch, useSelector } from 'react-redux';
import { ReduxState } from '../types';
import { deleteExpense } from '../redux/actions';
import { TableContainer } from './styles';
import trashIcon from '../public/trash.svg';
import editIcon from '../public/edit.svg';

function Table() {
  const { wallet: { expenses } } = useSelector((state:ReduxState) => state);
  const dispatch = useDispatch();

  return (
    <TableContainer>
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense: any) => (
            <tr key={ expense.id }>
              <td>{expense.description}</td>
              <td>{expense.tag}</td>
              <td>{expense.method}</td>
              <td>{(Number(expense.value)).toFixed(2)}</td>
              <td>{expense.exchangeRates[expense.currency].name}</td>
              <td>{Number(expense.exchangeRates[expense.currency].ask).toFixed(2)}</td>
              <td>
                {`R$ ${(Number(expense.exchangeRates[expense.currency].ask)
                * Number(expense.value)).toFixed(2)}`}
              </td>
              <td>Real</td>
              <td>
                <button>
                  {' '}
                  <img src={ editIcon } alt="" />
                </button>
                <button
                  data-testid="delete-btn"
                  onClick={ (e) => {
                    e.preventDefault();
                    dispatch(deleteExpense(expense.id));
                  } }
                >
                  {' '}
                  <img src={ trashIcon } alt="" />
                </button>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </TableContainer>
  );
}

export default Table;
