import { writable } from 'svelte/store'
import { supabase } from '../lib/supabase.js'
// ../../../...で戻ってく

// メモ格納用
export const memos = writable([]);

// 初期表示
export const loadMemos = async () => {
    // 非同期
    const {data, error} = await supabase.from('memos').select();
    // データが取得できなかった時はmemosを更新しない。
    if(error){
        return console.error(error)
    }
    memos.set(data)
}

// 追加
export const addMemos = async (body) => {
    const { data, error } = await supabase.from('memos').insert([
        { body: body}
    ])
    if(error){
        return console.error(error)
    }
//   storeのデータを更新。pushだとうまく行かない場合がある。
//   memos.update(memos => memos.push(data[0]))
// スプレッド演算子記法
    memos.update(memos => [...memos, data[0]])
}

// 削除
export const deleteMemos = async (id) => {
    const { data, error } = await supabase.from('memos').delete().match({id})
    if (error){
        return console.error(error)
    }
    memos.update(memos => memos.filter(memo => memo.id !== id))
}

/*
const score = [1,2,3,4]
const even = scores.filter(score%2===0)
*/