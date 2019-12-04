import { BehaviorSubject } from 'rxjs';

export class ChatModel {
    private from: any;
    private fromId: any;
    private to: any;
    private toId: any;
    private msg: any;
    private timestamp: any;

    constructor(chatModel) {
        this.from = chatModel.from;
        this.to = chatModel.to;
        this.fromId = chatModel.fromId;
        this.toId = chatModel.toId;
        this.msg = chatModel.msg;
        this.timestamp = chatModel.timestamp;
    }


    public get $timestamp(): any {
        return this.timestamp;
    }

    public set $timestamp(value: any) {
        this.timestamp = value;
    }


    public get $msg(): any {
        return this.msg;
    }

    public set $msg(value: any) {
        this.msg = value;
    }
    /**
     * Getter $from
     * @return {any}
     */
	public get $from(): any {
		return this.from;
	}

    /**
     * Getter $fromId
     * @return {any}
     */
	public get $fromId(): any {
		return this.fromId;
	}

    /**
     * Getter $to
     * @return {any}
     */
	public get $to(): any {
		return this.to;
	}

    /**
     * Getter $toId
     * @return {any}
     */
	public get $toId(): any {
		return this.toId;
	}

    /**
     * Setter $from
     * @param {any} value
     */
	public set $from(value: any) {
		this.from = value;
	}

    /**
     * Setter $fromId
     * @param {any} value
     */
	public set $fromId(value: any) {
		this.fromId = value;
	}

    /**
     * Setter $to
     * @param {any} value
     */
	public set $to(value: any) {
		this.to = value;
	}

    /**
     * Setter $toId
     * @param {any} value
     */
	public set $toId(value: any) {
		this.toId = value;
	}

}