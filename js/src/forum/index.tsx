import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';
import Post from 'flarum/forum/components/Post';
import CommentPost from 'flarum/forum/components/CommentPost';

/**
 * Renderiza a bio do usuário (fof/user-bio) como assinatura no rodapé de
 * cada post — mimetiza o comportamento histórico do MyBB.
 *
 * Lógica:
 *  1. Tenta `bioHtml` (HTML renderizado a partir do XML s9e — BBCode/Markdown
 *     já viraram <span style="color:..."> / <i> / <strong> etc).
 *  2. Cai para `bio` plain text com pre-wrap se bioHtml for null.
 *
 * `bio` retorna null quando `fof-user-bio.allowFormatting=true` e o actor não
 * é o dono da bio (esse é o comportamento documentado em
 * vendor/fof/user-bio/src/Api/AddUserBioFields.php). Por isso a lógica
 * prioriza bioHtml.
 */
app.initializers.add('ramon-post-signature', () => {
  extend(CommentPost.prototype, 'footerItems', function (items: any) {
    try {
      const post: any = (this as any).attrs?.post;
      const user: any = post?.user?.();
      if (!user) return;

      const bioHtml = readAttr(user, 'bioHtml');
      const bioPlain = readAttr(user, 'bio');

      const hasHtml = typeof bioHtml === 'string' && bioHtml.trim() !== '';
      const hasPlain = typeof bioPlain === 'string' && bioPlain.trim() !== '';

      if (!hasHtml && !hasPlain) return;

      items.add(
        'ramon-signature',
        m(
          'aside',
          { className: 'PostSignature', 'aria-label': 'Assinatura' },
          hasHtml
            ? m('div', { className: 'PostSignature-content' }, m.trust(bioHtml))
            : m('div', { className: 'PostSignature-content PostSignature-plain' }, bioPlain.trim())
        ),
        -50
      );
    } catch (err) {
      if (typeof console !== 'undefined' && console.error) console.error('[post-signature]', err);
    }
  });

  // Força webpack a manter Post como referência tipada.
  extend(Post.prototype, 'footerItems', function () {});
});

/**
 * Lê um atributo do modelo User defensivamente: tenta o getter tipado, depois
 * o `attribute()` raw do Flarum, depois `data.attributes[key]` cru.
 */
function readAttr(user: any, key: string): string | null {
  try {
    if (typeof user[key] === 'function') {
      const v = user[key]();
      return v == null ? null : String(v);
    }
    if (typeof user.attribute === 'function') {
      const v = user.attribute(key);
      return v == null ? null : String(v);
    }
    const raw = user?.data?.attributes?.[key];
    return raw == null ? null : String(raw);
  } catch {
    return null;
  }
}
