import { Container } from "react-bootstrap";
import ProfileBoard from "./ProfileBoard";
import ProfileHeader from "./ProfileHeader";

export default function UserProfile() {
    return (
        <Container fluid>
            <ProfileHeader />
            <ProfileBoard />
        </Container>
    )
}