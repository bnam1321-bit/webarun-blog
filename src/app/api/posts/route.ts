import { NextResponse } from 'next/server';
import { getAllPosts, getPostBySlug, savePost, deletePost } from '@/lib/blog';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');

    if (slug) {
      const post = getPostBySlug(slug);
      if (!post) {
        return NextResponse.json({ error: '포스트를 찾을 수 없습니다.' }, { status: 404 });
      }
      return NextResponse.json(post);
    }

    const posts = getAllPosts();
    return NextResponse.json(posts);
  } catch (error: any) {
    console.error('Error fetching posts:', error);
    return NextResponse.json({ error: '포스트 조회 중 오류가 발생했습니다.' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { slug, rawContent } = body;

    if (!slug || !rawContent) {
      return NextResponse.json({ error: '슬러그와 파일 내용(rawContent)이 필요합니다.' }, { status: 400 });
    }

    try {
      savePost(slug, rawContent);
      return NextResponse.json({ success: true });
    } catch (writeError: any) {
      console.error('Detailed write error:', writeError);
      return NextResponse.json({ 
        error: `서버 저장 실패: ${writeError.message || '알 수 없는 파일 시스템 오류'}` 
      }, { status: 500 });
    }
  } catch (error: any) {
    console.error('Error saving post:', error);
    return NextResponse.json({ error: '요청 처리 중 오류가 발생했습니다.' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');

    if (!slug) {
      return NextResponse.json({ error: '삭제할 포스트의 슬러그가 필요합니다.' }, { status: 400 });
    }

    const success = deletePost(slug);
    if (!success) {
      return NextResponse.json({ error: '포스트 삭제에 실패했습니다.' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error deleting post:', error);
    return NextResponse.json({ error: '포스트 삭제 중 오류가 발생했습니다.' }, { status: 500 });
  }
}
