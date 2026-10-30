const MAX_DECODING = 2;
const active = new Set<HTMLVideoElement>();

function retire(excess: number) {
  if (excess <= 0) return;
  const oldest = [...active].slice(0, excess);
  oldest.forEach((el) => {
    active.delete(el);
    el.pause();
  });
}

export function requestPlay(video: HTMLVideoElement) {
  if (active.has(video)) return;
  retire(active.size + 1 - MAX_DECODING);
  active.add(video);
  const promise = video.play();
  if (promise && typeof promise.catch === 'function') {
    promise.catch(() => {
      active.delete(video);
    });
  }
}

export function releasePlay(video: HTMLVideoElement) {
  active.delete(video);
  video.pause();
}

export function resetVideoRegistry() {
  active.clear();
}
