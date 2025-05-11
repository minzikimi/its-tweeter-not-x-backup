import db from "../lib/db";
import Link from "next/link";

export default async function UsersPage() {
  const users = await db.user.findMany({
    select: { id: true, username: true },
  });

  return (
    <div>
      <h1>Users</h1>
      {users.map(user => (
        <div key={user.id}>
          <Link href={`/users/${user.username}`}>{user.username}</Link>
        </div>
      ))}
    </div>
  );
}
