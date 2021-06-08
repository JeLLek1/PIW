import Layout from 'components/Layouts/Main';
import { useOrders } from './utils';
import {
  LinearProgress,
  Typography,
  Container,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  TableBody,
} from '@material-ui/core';
import React from 'react';
const Orders = () => {
  const { orders, isLoading, totalPrice } = useOrders();
  if (isLoading)
    return (
      <Layout>
        <LinearProgress style={{ marginTop: '-2.95rem' }} />
      </Layout>
    );
  return (
    <Layout>
      <Container maxWidth="lg">
        <Typography variant="h3" style={{ marginBottom: '2rem' }}>
          Zamówienia:
        </Typography>
        {orders.length ? (
          orders.map((order, i) => (
            <React.Fragment key={i}>
              <Typography variant="h5">
                Zamówienie z dnia:{' '}
                {(() => {
                  const date = new Date(order.dataCreate.seconds * 1000);
                  return `${date.getFullYear()}/${
                    date.getMonth() + 1
                  }/${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
                })()}
                :
              </Typography>
              <TableContainer
                component={Paper}
                style={{ marginBottom: '3rem' }}
              >
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Nazwa</TableCell>
                      <TableCell align="right">Składniki</TableCell>
                      <TableCell align="right">Cena</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {order.order.map(row => (
                      <TableRow key={row.name}>
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell align="right">
                          {row.isCustom && row.customAddOns.length
                            ? row.customAddOns.map(el => el.name).join(', ')
                            : '-'}
                        </TableCell>
                        <TableCell align="right">
                          {row.price.toFixed(2)}zł
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell />
                      <TableCell colSpan={1}>Razem</TableCell>
                      <TableCell align="right">
                        {totalPrice(order).toFixed(2)}zł
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </React.Fragment>
          ))
        ) : (
          <Typography variant="h5">
            W tej chwili nie masz żadnych zamówień...
          </Typography>
        )}
      </Container>
    </Layout>
  );
};
export default Orders;
