import { Container, Row } from "react-bootstrap";
import UserBulletItem from "./UserBulletItem";

export default function UserBulletList({ items }) {
    return (
        <Container fluid className="mt-3 mb-3">
            <Row>
                {items.map((item) => (
                    <UserBulletItem
                        key={item.id}
                        item={item}
                    />
                ))}
            </Row>
        </Container>
    )
}
