import db from "../lib/db";
import Link from "next/link";

export default async function UsersHome() {
  const users = await db.user.findMany({
    select: { username: true, id: true },
  });

  return (
    <div>
      <h1>All Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <Link href={`/users/${user.username}`}>{user.username}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
