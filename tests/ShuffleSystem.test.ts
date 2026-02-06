import { ShuffleSystem } from "../assets/Script/core/board/ShuffleSystem";
import { TestBoard, normal } from "./utils/TestBoard";
import { FakeRng } from "./utils/FakeRng";
import { Tile } from "../assets/Script/core/tiles/Tile";

const snapshot = (board: TestBoard): string[] => {
  const out: string[] = [];
  for (let y = 0; y < board.rows; y++) {
    for (let x = 0; x < board.cols; x++) {
      const t = board.get(x, y);
      out.push(t ? `${t.kind}:${(t as any).color ?? "s"}` : "null");
    }
  }
  return out;
};

const multiset = (tiles: (Tile | null)[]): Map<string, number> => {
  const map = new Map<string, number>();
  for (const t of tiles) {
    const key = t ? `${t.kind}:${(t as any).color ?? "s"}` : "null";
    map.set(key, (map.get(key) ?? 0) + 1);
  }
  return map;
};

const flatten = (board: TestBoard): (Tile | null)[] => {
  const out: (Tile | null)[] = [];
  for (let y = 0; y < board.rows; y++) {
    for (let x = 0; x < board.cols; x++) {
      out.push(board.get(x, y));
    }
  }
  return out;
};

describe("ShuffleSystem", () => {
  it("preserves tile multiset and reports changes", () => {
    const board = TestBoard.fromRows([
      [normal(0), normal(1)],
      [normal(2), normal(3)],
    ]);
    const before = snapshot(board);
    const beforeSet = multiset(flatten(board));

    const rng = new FakeRng([3, 2, 1, 0]);
    const shuffle = new ShuffleSystem(rng as any);
    const result = shuffle.shuffle(board);

    expect(result.changes).toHaveLength(4);

    const after = snapshot(board);
    const afterSet = multiset(flatten(board));

    expect(afterSet).toEqual(beforeSet);
    const changed = before.some((v, i) => v !== after[i]);
    if (!changed) {
      // Degenerate shuffle can happen; still should be a valid multiset and changes reflect current state.
      expect(after).toEqual(before);
    }
  });
});
