import { ShuffleSystem } from "../assets/Script/core/board/ShuffleSystem";
import { TestBoard, normal } from "./utils/TestBoard";
import { FakeRng } from "./utils/FakeRng";

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

describe("ShuffleSystem", () => {
  it("preserves tile count and reports changes", () => {
    const board = TestBoard.fromRows([
      [normal(0), normal(1)],
      [normal(2), normal(3)],
    ]);
    const before = snapshot(board);
    const rng = new FakeRng([0]);
    const shuffle = new ShuffleSystem(rng as any);
    const result = shuffle.shuffle(board);

    expect(result.changes).toHaveLength(4);

    const after = snapshot(board);
    const changed = before.some((v, i) => v !== after[i]);
    expect(changed).toBe(true);
  });
});
