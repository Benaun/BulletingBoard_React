import ProfileBoard from "./ProfileBoard";
import ProfileHeader from "./ProfileHeader";
import css from './UserProfile.module.css';

export default function UserProfile() {
    return (
        <div className="container">
            <div className={css.user__profile}>
                <ProfileHeader />
                <ProfileBoard />
            </div>
        </div>
    )
}