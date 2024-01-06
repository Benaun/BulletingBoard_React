import { Container, Row } from "react-bootstrap";
import BulletItem from "./BulletItem";

export default function BulletList({ items }) {

    return (
        <Container fluid className="mt-3 mb-3">
            <Row>
                {items?.map((item) => (
                    <BulletItem
                        key={item.id}
                        item={item}
                    />
                ))}
            </Row>
        </Container>
    )
}
