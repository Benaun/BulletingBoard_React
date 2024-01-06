import { useState,} from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import UserBullets from './UserBullets';
import FavoritesBullets from './FavoriteBullets';
import { Container } from 'react-bootstrap';

export default function ProfileBoard() {
    const [key, setKey] = useState('bullets');

    return (
        <Container fluid className='mt-4'>
            <main style={{minHeight: "76vh"}}>
                <Tabs
                    id="tabs"
                    activeKey={key}
                    onSelect={(k) => setKey(k)}
                >
                    <Tab eventKey="bullets" title="Мои объявления">
                        <UserBullets />
                    </Tab>
                    <Tab eventKey="favorites" title="Избранное">
                        <FavoritesBullets />
                    </Tab>
                </Tabs>
            </main>
        </Container>
    );
}
