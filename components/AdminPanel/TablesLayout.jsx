import { Fragment } from 'react';
import Table from 'react-bootstrap/Table';

export default function TableLayout({ items, columns, newUserId, children }) {
    return (
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        {columns.map(({ title }) =>
                            <th
                                key={title}
                            >
                                {title}
                            </th>)}
                    </tr>
                </thead>
                <tbody>
                    {items.map(item =>
                        <Fragment key={item.id}>
                            {String(item.id) === String(newUserId)
                                ? <>{children}</>
                                : <tr
                                    key={item.id}
                                    data-user-id={item.id}>
                                    {columns.map(({ title, getVal }) => <td key={title}>{getVal(item)}</td>)}
                                </tr>}
                        </Fragment>
                    )}
                </tbody>
                {!newUserId &&
                    <tfoot responsive>
                        {children}
                    </tfoot>
                }
            </Table>
    );
}