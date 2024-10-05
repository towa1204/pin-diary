import { deletePage, getPage } from "./deps.ts";
import type { Socket } from "./deps.ts";

/**
 * 編集されていないページであれば削除する
 */
export const deleteNoEditDiary = async (
  project: string,
  title: string,
  socket: Socket,
) => {
  // ページコンテンツ取得
  const res = await getPage(project, title);
  if (!res.ok) {
    throw new Error("failed to fetch page contents.");
  }

  // 未編集ページ判定
  const pageLines = res.value.lines;

  const isEdit = pageLines.some((line) => {
    return line.created !== line.updated;
  });
  if (isEdit) return;

  // ページ削除
  await deletePage(project, title, { socket });
};
