import Header from './Header';

const links = [
    { label: 'Published Readings', href: '/readings' },
    { label: 'Add New', href: '/addnewreading' },
    { label: 'Profile', href: '/profile' }
];

export default function AuthorDashboard() {
    return <Header navLinks={links} />;
}
