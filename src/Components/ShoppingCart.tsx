import { useRef, useState } from "react";
import { url } from "../config";
import { book as booktype } from '../Pages/Books'
function ShoppingCart({ user, books, done, remove }: {
    user: string,
    books: booktype[],
    done: (bookids: string[]) => void,
    remove: (isbn: string) => void
}): JSX.Element {
    const [failedbooks, setFailedbooks] = useState<booktype[]>([]);
    const [loading, setLoading] = useState(false);
    const barcodes = useRef<string[]>([]);
    function borrowMany() {
        setLoading(true);
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
                        return { ok: true, book: book, bookid: obj.bookid as string }
                    } else {
                        return { ok: false, book: book, bookid: "" }
                    }
                },
                () => ({ ok: false, book: book, bookid: "" })
            ))).then(values => {
                const successed = values.filter(value => value.ok).map(value => `${value.book.isbn}/${value.bookid}/${value.book.position}`);
                if (successed.length === books.length) {
                    done(successed);
                } else {
                    barcodes.current = successed;
                    setFailedbooks(values.filter(value => !value.ok).map(value => value.book));
                }
                setLoading(false);
            })
    }
    return <button onClick={borrowMany}>BorrowMany</button>
}
export default ShoppingCart;