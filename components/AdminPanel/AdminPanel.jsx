import { Container } from "react-bootstrap";
import BulletsTable from "./BulletsTable";
import UsersTable from "./UsersTable";

export default function AdminPanel (){
    return (
        <Container fluid className="mt-3">
            <BulletsTable />
            <UsersTable />
        </Container>
    )
}