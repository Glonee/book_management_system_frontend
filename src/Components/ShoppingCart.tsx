import { url } from "../config";
import { book as booktype } from '../Pages/Books'
export interface responsetype {
    ok: boolean;
    isbn: string;
    bookid: string;
}
function ShoppingCart({ user, books, done }: { user: string, books: booktype[], done: (response: responsetype[]) => void }) {
    function borrowMany() {
        Promise.all(books.map(book => fetch(`${url}/user`, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({
                action: "borrow",
                username: user,
                isbn: book.isbn,
                num: 1
            })
        })
            .then(res => res.json())
            .then(
                obj => {
                    if (obj.state === 0) {
                        return { ok: true, isbn: book.isbn, bookid: obj.bookid as string }
                    } else {
                        return { ok: false, isbn: book.isbn, bookid: "" }
                    }
                },
                () => ({ ok: false, isbn: book.isbn, bookid: "" })
            ))).then(values => done(values))
    }
    return <button onClick={borrowMany}>BorrowMany</button>
}
export default ShoppingCart;